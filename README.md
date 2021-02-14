# What is this repository?

This is just an experimental example to show Apache Arrow data's transfer from Python to Typescript.

## Summary

- For Python, both `pa.ipc.new_file()` (by using `RecordBatchFileWriter`) and `pa.feather.write_feather()` create a valid output data, but `write_feather()` **MUST** set `compression='uncompressed'` becausse typescript cannot handle compressed feather format.
- For typescript, current version of `Table.toString()` does not show all values, just shows `[object Object]`

## Run example

### Environment

```sh
python -V
Python 3.9.1
# pip install pandas==1.2.2 pyarrow==3.0.0 tabulate==0.8.7
node -v
v15.8.0
tsc -v
Version 4.1.5
cat package.json 
{
  "devDependencies": {
    "@types/node": "^14.14.27",
    "apache-arrow": "^3.0.0"
  }
}
```

```sh
git clone git@github.com:koizumihiroo/apache-arrow-py-ts-example.git
cd apache-arrow-py-ts-example
docker-compose build
docker-compose run --rm app # shows markdown table input and output
```

### input

```txt
# df.dtypes
col_Int64                 Int64
col_Float64             Float64
col_float64             float64
col_str                  string
col_Timestamp    datetime64[ns]
col_date                 object
```

|    | col_Int64   | col_Float64   |   col_float64 | col_str   | col_Timestamp       | col_date   |
|---:|:------------|:--------------|--------------:|:----------|:--------------------|:-----------|
|  0 | <NA>        | 0.0           |           0   | a         | 2021-02-13 00:00:00 | 2021-02-13 |
|  1 | 1           | <NA>          |           1.1 | b         | 2021-02-14 00:00:00 | 2021-02-14 |
|  2 | 2           | 0.2           |         nan   | c         | 2021-02-15 00:00:00 | 2021-02-15 |
|  3 | 3           | 0.3           |           3.3 | e         | 2021-02-16 00:00:00 | 2021-02-16 |
|  4 | 4           | 0.4           |           4.4 | d         | 2021-02-17 00:00:00 | 2021-02-17 |


### output

Typescript

|col_Int64<br>Int64<br>nullable | col_Float64<br>Float64<br>nullable | col_float64<br>Float64<br>nullable | col_str<br>Utf8<br>nullable | col_Timestamp<br>Timestamp<NANOSECOND><br>nullable | col_date<br>Date32<DAY><br>nullable|
| --- | --- | --- | --- | --- | --- |
| | 0 | 0 | a | 1613174400000 | Sat Feb 13 2021 00:00:00 GMT+0000 (Coordinated Universal Time)|
|1 |  | 1.1 | b | 1613260800000 | Sun Feb 14 2021 00:00:00 GMT+0000 (Coordinated Universal Time)|
|2 | 0.2 |  | c | 1613347200000 | Mon Feb 15 2021 00:00:00 GMT+0000 (Coordinated Universal Time)|
|3 | 0.3 | 3.3 | e | 1613433600000 | Tue Feb 16 2021 00:00:00 GMT+0000 (Coordinated Universal Time)|
|4 | 0.4 | 4.4 | d | 1613520000000 | Wed Feb 17 2021 00:00:00 GMT+0000 (Coordinated Universal Time)|

