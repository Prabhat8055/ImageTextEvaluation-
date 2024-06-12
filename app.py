from flask import Flask, render_template, request, flash
from werkzeug.utils import secure_filename
import os
import cv2
import numpy as np
import matplotlib.pyplot as plt

app = Flask(__name__)
app.secret_key = "the random string"
# Define the upload folder
UPLOAD_FOLDER = os.path.join("static", "uploads")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# Function to check if the uploaded file has an allowed extension
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# function to process the image
def processImage(filename):
    image = cv2.imread(f"static/uploads/{filename}")
    print(image)

    blurred_image = cv2.GaussianBlur(image, (5, 5), 0)

    # Calculate the sharpened image by subtracting the blurred image from the original
    sharpened_image = cv2.addWeighted(image, 1.5, blurred_image, -0.7, 0)

    # Apply Bilateral filter
    blurred_image = cv2.bilateralFilter(sharpened_image, 15, 100, 100)  # was 65 , 65
    image2 = blurred_image

    pixels = image2.reshape((-1, 3))

    # Convert to float32 for K-means clustering
    pixels = np.float32(pixels)

    # Define the number of clusters (segments) you want
    num_clusters = 3  # was 5

    # Apply K-means clustering
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)
    _, labels, centers = cv2.kmeans(
        pixels, num_clusters, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS
    )

    # Convert the centers back to uint8
    centers = np.uint8(centers)

    # Assign each pixel to one of the clusters
    segmented_image = centers[labels.flatten()].reshape((image.shape))

    threshold_value = 90
    mask = np.where(segmented_image > threshold_value, 180, 0).astype(np.uint8)

    contrast = 1.5  # was 1.5
    brightness = 10  # was 10

    adjusted_image = cv2.convertScaleAbs(mask, alpha=contrast, beta=brightness)

    blurred_image11 = cv2.GaussianBlur(adjusted_image, (5, 5), 0)
    sharpened_image11 = cv2.addWeighted(adjusted_image, 3.0, blurred_image11, -0.7, 0)

    blurred_image111 = cv2.GaussianBlur(sharpened_image11, (5, 5), 0)
    sharpened_image111 = cv2.addWeighted(
        sharpened_image11, 3.0, blurred_image111, -0.7, 0
    )

    cv2.imwrite(f"static/{filename}", sharpened_image111)
    return filename


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/team")
def team():
    return render_template("team.html")


@app.route("/about")
def aboutUs():
    return render_template("about.html")


@app.route("/project", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        if "img" not in request.files:
            return render_template("index.html", error="No file part")

        file = request.files["img"]

        if file.filename == "":
            return render_template("index.html", error="No selected file")

        if not allowed_file(file.filename):
            return render_template("index.html", error="Invalid file extension")

        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

        processImage(filename)

        img_url = os.path.join("/static/", filename)

        flash(
            f"Your image has been processes and is available here <a target='_blank' href='/static/{filename}'> here </a>"
        )

        return render_template("project.html", img_url=img_url)

    return render_template("project.html")


if __name__ == "__main__":
    app.run(debug=True)
