/**
 * Этот метод почему-то иногда не присваивает цвет
let getRandomColor = () =>'#' + Math.floor(Math.random()*16777215).toString(16);
 **/
let getRandomColor = () =>
    `rgb(${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)})`;

const tellPos = (p) => {
    [m_x, m_y] = [p.clientX, p.clientY];
}

const spawnerDiv = document.querySelector('.spawner');
const gridDiv = document.querySelector('.grid');
const chaoticDiv = document.querySelector('.chaotic');
let m_x = 0;
let divPlaced;
let m_y = 0;

const createColorDiv = (p, color = getRandomColor() , pos = 'absolute', cursor = 'grabbing') => {
   const tempDiv = document.createElement('div');
    tempDiv.style.width = '100px';
    tempDiv.style.height = '100px';
    if (p !== null) {
        tempDiv.style.top = `${p[1] - 50}px`;
        tempDiv.style.left = `${p[0] - 50}px`;
    }
    tempDiv.style.backgroundColor = color;
    tempDiv.style.position = pos;
    tempDiv.style.cursor = cursor;
    tempDiv.style.zIndex = '1';
    return tempDiv;
}
const DragAndDrop = () => {

    const colorDiv = createColorDiv([m_x, m_y]);
    divPlaced = false;

    document.body.appendChild(colorDiv);

    document.onpointermove = () => {
        colorDiv.style.top = `${m_y - 50}px`;
        colorDiv.style.left = `${m_x - 50}px`;
    }

    document.onpointerup = () => {
        if (divPlaced)
            return
        colorDiv.remove();
        const [drop_x, drop_y] = [m_x, m_y];
        const dropDiv = document.elementFromPoint(drop_x, drop_y);

        //Чек нужен, чтобы даже если маленьким куском colorDiv задевал chaoticDiv, то он появлялся там.
        //Если нужно, чтобы курсор был внутри, то оставить только 1 строчку.
        const chaoticDivCheck = (x, y) => {
            return document.elementFromPoint(drop_x, drop_y).classList.contains('chaotic') ||
                document.elementFromPoint(drop_x + 50, drop_y).classList.contains('chaotic') ||
                document.elementFromPoint(drop_x + 50, drop_y - 50).classList.contains('chaotic') ||
                document.elementFromPoint(drop_x + 50, drop_y + 50).classList.contains('chaotic') ||
                document.elementFromPoint(drop_x, drop_y - 50).classList.contains('chaotic') ||
                document.elementFromPoint(drop_x, drop_y + 50).classList.contains('chaotic') ||
                document.elementFromPoint(drop_x - 50, drop_y).classList.contains('chaotic') ||
                document.elementFromPoint(drop_x - 50, drop_y - 50).classList.contains('chaotic') ||
                document.elementFromPoint(drop_x - 50, drop_y + 50).classList.contains('chaotic');

        }

        if(dropDiv.classList.contains('gridElem')) {
            dropDiv.style.backgroundColor = colorDiv.style.backgroundColor;
        } else if (chaoticDivCheck(drop_x, drop_y)) {
            chaoticDiv.appendChild(createColorDiv([m_x, m_y], colorDiv.style.backgroundColor, 'absolute', 'pointer'));
        }
        divPlaced = true;

    }

}

for (let i = 0; i < 28; ++i) {
    const tempDiv=(createColorDiv(null, 'none', ' ', 'pointer'))
    tempDiv.classList.add('gridElem');
    gridDiv.appendChild(tempDiv);
}

spawnerDiv.onpointerdown = DragAndDrop;
document.addEventListener('mousemove', tellPos, false);
