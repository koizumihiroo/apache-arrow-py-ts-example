import pyarrow.feather as feather

from make_dataframe import make_df

df = make_df()
# https://stackoverflow.com/questions/64629670/how-to-write-a-pandas-dataframe-to-arrow-file#comment114342043_64648955
# For JS, compressed feather is not yet implemeted
feather.write_feather(df, 'data/df.feather', compression='uncompressed')
