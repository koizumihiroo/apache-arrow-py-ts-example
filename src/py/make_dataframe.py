import datetime
import pandas as pd


def make_df() -> pd.DataFrame:
    df = pd.DataFrame({
        'col_Int64': [None, 1, 2, 3, 4],
        'col_Float64': [0.0, None, 0.2, 0.3, 0.4],
        'col_float64': [0.0, 1.1, None, 3.3, 4.4],
        'col_str': list('abced'),
        'col_Timestamp': [pd.Timestamp(str(20210213 + i)) for i in range(5)],
        'col_date': [datetime.date(2021, 2, 13 + i) for i in range(5)]
    }).convert_dtypes().astype({'col_float64': 'float'})
    return df
