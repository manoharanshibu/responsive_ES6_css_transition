/**
 * Author : Shibu Manoharan
 * Date : 04/06/2017
 */
const shape1 = document.getElementById('shape1'),
  shape2 = document.getElementById('shape2'),
  shape3 = document.getElementById('shape3'),
  shape4 = document.getElementById('shape4')
  shape5 = document.getElementById('shape5');

const MIN_OPACITY = 0.50,
      MAX_OPACITY = 1.00,
      SIZE = 100,
      OFFSET = 10;

const ITEM_ARRAY = [
    {item: shape1, text: 'Red'},
    {item: shape2, text: 'Green'},
    {item: shape3, text: 'Blue'},
    {item: shape4, text: 'Orange'},
    {item: shape5, text: 'Yellow'}
];

/**
 * sets the listeners, initialize tooltip
 */
const setShapeObject = (shape, text) => {
  const tooltip = document.createElement('span');
  tooltip.id = 'tooltip';
  tooltip.appendChild(document.createTextNode(text));
  document.getElementById('container').appendChild(tooltip);

  /*
   * Mouse square handler to set opacity and tooltip
   */
  shape.addEventListener('mousemove', (e) => {
    tooltip.style.top = e.clientY + OFFSET + 'px';
    tooltip.style.left = e.clientX + 'px';
    tooltip.style.display = 'block';

    shape1.style.opacity = MAX_OPACITY;
    shape2.style.opacity = MAX_OPACITY;
    shape3.style.opacity = MAX_OPACITY;
    shape4.style.opacity = MAX_OPACITY;
    shape5.style.opacity = MAX_OPACITY;
      
    if (shape.classList.length === shape1.classList.length) shape1.style.opacity = MIN_OPACITY;
    if (shape.classList.length === shape2.classList.length) shape2.style.opacity = MIN_OPACITY;
    if (shape.classList.length === shape3.classList.length) shape3.style.opacity = MIN_OPACITY;
    if (shape.classList.length === shape4.classList.length) shape4.style.opacity = MIN_OPACITY;
    if (shape.classList.length === shape5.classList.length) shape5.style.opacity = MIN_OPACITY;

    shape.style.opacity = MAX_OPACITY;
  }, false);

  /*
   * reset shape opacity on mouseout
   */
  shape.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
    shape1.style.opacity = MAX_OPACITY;
    shape2.style.opacity = MAX_OPACITY;
    shape3.style.opacity = MAX_OPACITY;
    shape4.style.opacity = MAX_OPACITY;
    shape5.style.opacity = MAX_OPACITY;
  }, false);
    
  /*
   * Click event handler to change the shape class
   */
  shape.addEventListener('click', () => {
    if (!shape.classList.contains('square')) {
      shape.classList.add('square');
    } else {
      shape.classList.remove('square');
    }
    onResize(window);
  }, false)
}


/* 
 * sort shapes and set shape 
 * returns current row
 */
let alignShapes = (_target, isCircle, _row) => {
    let noShapes = true, _index = 0;
    
    ITEM_ARRAY.map((item) => {         
        if(isCircle ? !item.item.classList.contains('square') : item.item.classList.contains('square')){
            if((_index + 1) * (SIZE + OFFSET) > _target.innerWidth){
                _index = 0;
                _row++;
            }
            item.item.style.left = (_index) * (SIZE + OFFSET)+'px';
            item.item.style.top = (_row) * (SIZE + OFFSET)+'px';
            _index ++;
            noShapes = false;
        }
    });
    
    // when empty row
    if(noShapes) _row--;
    
    return _row;
}

/*
 * Responsive page setting programatically
 */
let onResize = (_target) => {    
    // Align circle rows    
    let _row = alignShapes(_target, true, 0);  
    
    _row++;
    
    // Align Squares
    _row = alignShapes(_target, false, _row);
    _row++; 
    
    document.getElementById('footer').style.top = (_row + 1) * (SIZE + OFFSET)+'px'
}

ITEM_ARRAY.map((item) => {
    setShapeObject(item.item, item.text);
});


window.addEventListener('resize', (e) => onResize(e.currentTarget));
if(window.innerWidth < 440) onResize(window);