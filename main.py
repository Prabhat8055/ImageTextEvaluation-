import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load an image
image = cv2.imread('original.jpg')

blurred_image = cv2.GaussianBlur(image, (5, 5), 0)

# Calculate the sharpened image by subtracting the blurred image from the original
sharpened_image = cv2.addWeighted(image, 1.5, blurred_image, -0.7, 0)

# Apply Bilateral filter
blurred_image = cv2.bilateralFilter(
    sharpened_image, 15, 100, 100)  # was 65 , 65
image2 = blurred_image

pixels = image2.reshape((-1, 3))

# Convert to float32 for K-means clustering
pixels = np.float32(pixels)

# Define the number of clusters (segments) you want
num_clusters = 3  # was 5

# Apply K-means clustering
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)
_, labels, centers = cv2.kmeans(
    pixels, num_clusters, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)

# Convert the centers back to uint8
centers = np.uint8(centers)

# Assign each pixel to one of the clusters
segmented_image = centers[labels.flatten()].reshape((image.shape))

threshold_value = 90
mask = np.where(segmented_image > threshold_value, 180, 0).astype(np.uint8)

contrast = 1.5  # was 1.5
brightness = 16  # was 10

adjusted_image = cv2.convertScaleAbs(mask, alpha=contrast, beta=brightness)

blurred_image11 = cv2.GaussianBlur(adjusted_image, (5, 5), 0)
sharpened_image11 = cv2.addWeighted(adjusted_image, 3.0, blurred_image11, -0.7, 0)

blurred_image111 = cv2.GaussianBlur(sharpened_image11, (5, 5), 0)
sharpened_image111 = cv2.addWeighted(sharpened_image11, 3.0, blurred_image111, -0.7, 0)

display = [image, sharpened_image111]
label = ['Original Image', 'last output']
# Save the segmented image
# cv2.imwrite('segmented_image.jpg', segmented_image)


fig = plt.figure(figsize=(12, 10))

for i in range(len(display)):
    fig.add_subplot(1, 2, i + 1)
    # Convert BGR to RGB for matplotlib
    plt.imshow(cv2.cvtColor(display[i], cv2.COLOR_BGR2RGB))
    plt.title(label[i])

plt.show()

