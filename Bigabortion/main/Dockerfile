FROM python:3.10
# Select the base image that is best for our application
# Install any operating system junk

# Set the working directory to copy stuff to
WORKDIR /app
# Copy all the code from the local directory into the image

COPY . .
# Install any language dependencies

RUN pip install -r requirements.txt

RUN pip install requests

RUN pip install django-cors-headers

# Set the command to run the application

CMD gunicorn --bind 0.0.0.0:8000 abortion.wsgi
