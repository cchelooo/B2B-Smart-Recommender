import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
import nltk

nltk.download('stopwords')  # solo la primera vez
spanish_stopwords = stopwords.words('spanish')

def generar_recomendaciones_personalizadas(historial, productos):
    productos_df = pd.DataFrame(productos)

    if not historial:
        # Si no hay historial, devolver productos aleatorios variados por categoría
        productos_agrupados = productos_df.groupby("category").apply(
            lambda x: x.sample(n=1) if len(x) >= 1 else pd.DataFrame()
        )
        extras = productos_df[~productos_df["id_product"].isin(productos_agrupados["id_product"])]
        adicionales = extras.sample(n=min(6 - len(productos_agrupados), len(extras)))
        mezcla = pd.concat([productos_agrupados, adicionales]).head(6)
        return mezcla.to_dict(orient="records")

    historial_df = pd.DataFrame(historial)

    # ⚠️ Excluir productos ya comprados
    productos_df = productos_df[~productos_df["id_product"].isin(historial_df["id_product"])]

    if productos_df.empty:
        return []

    # Contar cuántos productos de cada categoría ha comprado el usuario
    preferencias = (
        historial_df.groupby("category")["quantity"]
        .sum()
        .sort_values(ascending=False)
        .to_dict()
    )

    # Asignar puntaje base por categoría
    def calcular_score(row):
        return preferencias.get(row["category"], 0)

    productos_df["score"] = productos_df.apply(calcular_score, axis=1)

    # Calcular TF-IDF de las descripciones
    tfidf = TfidfVectorizer(stop_words=spanish_stopwords)
    tfidf_matrix = tfidf.fit_transform(productos_df["description"].fillna(""))
    productos_df["score"] += tfidf_matrix.sum(axis=1).A1

    # Ordenar por score
    top = productos_df.sort_values(by="score", ascending=False)

    # Tomar máximo 4 con mejor score
    seleccionados = top.head(4)

    # Añadir productos de categorías poco compradas o sin score
    candidatos_extra = productos_df[~productos_df["id_product"].isin(seleccionados["id_product"])]
    adicionales = candidatos_extra.sample(n=min(6 - len(seleccionados), len(candidatos_extra)))

    # Combinar ambos
    mezcla = pd.concat([seleccionados, adicionales]).drop_duplicates(subset="id_product").head(6)

    return mezcla.to_dict(orient="records")
