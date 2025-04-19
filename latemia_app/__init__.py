from flask import Flask


app = Flask(__name__)


from latemia_app.views import home