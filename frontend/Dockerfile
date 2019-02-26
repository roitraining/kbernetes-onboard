FROM python:3
COPY . .
RUN pip3 install -r requirements.txt
ENV GREETING 'Welcome to Hip-Local in Docker'
CMD [ "python3", "./main.py" ]