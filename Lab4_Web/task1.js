const changeBackgroundColor = () => {
    const randomColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
    document.body.style.backgroundColor = randomColor;
};


document.getElementById('changeColorButton').addEventListener('click', changeBackgroundColor);