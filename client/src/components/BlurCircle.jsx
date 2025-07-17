
import React from 'react'






const BlurCircle = ({top = "auto", left = "auto", right = "auto", bottom = "auto"}) => {
  return (
    <div className="absolute -z-50 h-58 w-58 aspect-square rounded-full bg-primary/30 blur-3xl"  
    style={{top: top, left: left, right: right, bottom: bottom }}>
      
    </div>
  )
}

export default BlurCircle










/*
tailwind styles:-
| Class           | Easy Meaning                                                                     |
| --------------- | -------------------------------------------------------------------------------- |
| absolute        | Place the div freely anywhere using top/left/right/bottom from parent.           |
| -z-50           | Sends the div far behind other elements (like a background shape).               |
| h-58 w-58       | Sets height and width to 14.5rem (232px).                                        |
| aspect-square   | Keeps the box a perfect square (equal height and width).                         |
| rounded-full    | Makes the box fully round — a circle.                                            |
| bg-primary/30   | Background color with 30% opacity using your primary color.                      |
| blur-3xl        | Applies strong blur — used for glowing or soft effects.           

 This just makes the element absolutely positioned, but doesn’t say where to place it.




understand:-

z-index: -50;
Which means:
🟦 "Place this element far behind everything else."


⚠️ Without the - sign:
z-50 → z-index: 50 (on top of most elements)
-z-50 → z-index: -50 (deep behind)







position of this blue circle is decided by:-  
this line :------------->     style={{top: top, left: left, right: right, bottom: bottom }}>

and here we pass props in      top ,  bottom,left  ,right   from the function

✅ When top, right, bottom, and left are all auto with position: absolute
The element stays at its default place.
That default is usually the top-left corner of the parent.










*/
