function keyPressed() {
    console.log(keyCode)
    if (keyCode == 83) { // key = s
        save()
    }
    if (keyCode == 70) { // key = r
        document.location.reload(true)
    }
}