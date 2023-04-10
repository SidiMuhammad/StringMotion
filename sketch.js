let docWidth = document.documentElement.offsetWidth
let docHeight = document.documentElement.offsetHeight

let stringCount = 20
let ubur = []
let qx1, px1, px2, px3, px4, qy1, py1, py2, py3, py4

let canvas = document.querySelector('svg')
let canvasHeight = 200

if (docHeight > docWidth) {
    canvasHeight = Math.floor(docHeight/docWidth*10)*20
    canvas.setAttribute("viewBox", "0 0 200 "+canvasHeight)
}

getPoint()

function getPoint() {
    var pHeight = canvasHeight/10

    var iqx1 = anime.random(2, 10)
    qy1 = anime.random(0, pHeight/5)

    var qx2 = anime.random(1, 9)
    var qy2 = anime.random(pHeight/5, pHeight/5*2)

    var qx3 = anime.random(1, 9)
    var qy3 = anime.random(pHeight/5*2, pHeight/5*3)

    var qx4 = anime.random(1, 9)
    var qy4 = anime.random(pHeight/5*3, pHeight/5*4)

    var qx5 = anime.random(1, 10)
    var qy5 = anime.random(pHeight/5*4, pHeight)

    qx2 += (qx2-iqx1)%2
    qy2 += Math.abs(qy2-qy1)%2
    qx3 += (qx3-qx2)%2
    qy3 += Math.abs(qy3-qy2)%2
    qx4 += (qx4-qx3)%2
    qy4 += Math.abs(qy4-qy3)%2
    qx5 += (qx5-qx4)%2
    qy5 += Math.abs(qy5-qy4)%2

    var ipx1 = iqx1+((qx2-iqx1)/2)
    var ipx2 = qx2+((qx3-qx2)/2)
    var ipx3 = qx3+((qx4-qx3)/2)
    var ipx4 = qx4+((qx5-qx4)/2)

    py1 = qy1+((qy2-qy1)/2)
    py2 = qy2+((qy3-qy2)/2)
    py3 = qy3+((qy4-qy3)/2)
    py4 = qy4+((qy5-qy4)/2)

    if (qy5 < qy4 || qy4 < qy3 || qy3 < qy1) {
        10
    }

    // console.log("M 10 2 Q "+(iqx1+10)+" "+qy1+" "+(ipx1+10)+" "+py1+" T "+(ipx2+10)+" "+py2+" T "+(ipx3+10)+" "+py3+" T "+(ipx4+10)+" "+py4+" T 10 18");

    qx1 = arrayRange(100-iqx1*10, 100+iqx1*10, stringCount)
    px1 = arrayRange(100-ipx1*10, 100+ipx1*10, stringCount)
    px2 = arrayRange(100-ipx2*10, 100+ipx2*10, stringCount)
    px3 = arrayRange(100-ipx3*10, 100+ipx3*10, stringCount)
    px4 = arrayRange(100-ipx4*10, 100+ipx4*10, stringCount)

}

function arrayRange(start, stop, length) {
    return Array.from(
        {length: length},
        (value, index) => start+index*(stop-start)/(length-1)
    )
}

function drawString (i) {
    let string = document.createElementNS("http://www.w3.org/2000/svg", "path")
    string.setAttribute("stroke", "url(#fill1)")
    string.setAttribute("stroke-width", "0.4")
    string.setAttribute("d", getPath(i))
    canvas.appendChild(string)
}

function animation(i) {
    anime({
        targets: document.querySelectorAll('path')[i],
        d: getPath(i),
        duration: 1000,
        delay: 1000,
        easing: 'linear',
        complete: function(anim) {
            if (i == stringCount-1) {
                updatePoint()
            }
        }
    })
}

function getPath(i) {
    return "M 100 20 Q "+qx1[i]+" "+qy1*10+" "+px1[i]+" "+py1*10+" T "+px2[i]+" "+py2*10+" T "+px3[i]+" "+py3*10+" T "+px4[i]+" "+py4*10+" T 100 "+(canvasHeight-20)
}

for (let i = 0; i < stringCount; i++) {
    drawString(i)
}

updatePoint()

function updatePoint() {
    getPoint()
    for (let i = 0; i < stringCount; i++) {
        animation(i)
    }
}