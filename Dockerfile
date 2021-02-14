FROM nikolaik/python-nodejs:python3.9-nodejs15-slim

WORKDIR /work
RUN pip install pandas==1.2.2 pyarrow==3.0.0
RUN npm install -g typescript ts-node
RUN npm install --save-dev @types/node apache-arrow
COPY src .
# RUN tsc --init --target ESNEXT
CMD ["bash"]