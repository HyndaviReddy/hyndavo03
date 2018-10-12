function bmi () {
    var height = Number(document.getElementById("height").value);
    var weight = Number(document.getElementById("weight").value);
    var result = weight / (height * height);
    document.getElementById("result").innerHTML = "Your bmi score is : " + result;
    }