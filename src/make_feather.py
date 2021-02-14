import pyarrow.feather as feather

from make_dataframe import make_df

df = make_df()
feather.write_feather(df, './df.feather')
