module.exports = (currentImages, newImages) => {
    //Just Adding Our New Pictures To Current Pictures
    newImages.forEach(image => currentImages.push(image))

    return currentImages
}