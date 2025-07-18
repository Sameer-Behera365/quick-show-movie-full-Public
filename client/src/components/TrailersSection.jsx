import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

const TrailersSection = () => {

    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])


    /*
    ✅ useState(dummyTrailers[0])     so iron hearrt tariler

    You’re telling React:
    "Start with the first trailer from dummyTrailers as the selected one."
    */


  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>    {/*max-w stands for maximum width   so — it controls how wide an element is allowed to grow at most     here :-  here we gave  max-w-[960px]    so max is 960px here*/}




{/*----------------------------showing the big trailer --------------------------*/}
      <div className='relative mt-6'>
        <BlurCircle top='-100px' right='-100px'/>
        <ReactPlayer      src={currentTrailer.videoUrl}         controls={true} className="mx-auto max-w-full" width="960px" height="540px"/>  {/*mx-auto   means    "Set left and right margins to auto"   and that basically means  ---> “Push the element to the center of its aprent   by evenly distributing the remaining space on both sides.” */}     {/*here false so it doesnt pay initially  we need to click it*/}   {/*     What it means:max-w-full = "The element can be as wide as its parent, but not wider than that."   */}  
      </div>

{/* 
🔍 in this react player there are two widths What Each Part Does:
width="960px" → This tells ReactPlayer to be 960 pixels wide initially .
      
max-w-full → Tailwind class that says:
"Allow the width to be up to 100% of its parent container — but not more  on stretching the screen."

*/}
      







{/*-------------------- showing the other trailers in small windows----------------------------- */}


{/*

here we did group from tailwind css   

by doing Add group to the parent element.
we Use group-hover:, group-focus:, etc., 
on the child to apply styles when the parent is hovered. */
}



      <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
        {dummyTrailers.map((trailer)=>(


            <div key={trailer.image} className='relative  group-hover:opacity-50 hover:!opacity-100 hover:-translate-y-1    duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer' onClick={()=> setCurrentTrailer(trailer)}>

                <img src={trailer.image} alt="trailer" className='rounded-lg w-full h-full object-cover brightness-75'/>{/*   brightness-75 means Reduces the image brightness to 75%   from 100 (makes it slightly dimmer). */}
                <PlayCircleIcon strokeWidth={2.1} className="absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12       transform -translate-x-1/2 -translate-y-1/2       "/>   {/* in docs */}
            </div>


        ))}
      </div>
    </div>
  )
}

export default TrailersSection




/*
understand overflow-hidden

🧱 You have two nested <div>s:

<div className="outer-div overflow-hidden">
  <div className="inner-div"> ... </div>
</div>

❓ What does overflow-hidden on the outer div mean?
It means:Any content inside the inner <div> that goes beyond the size (width/height) of the outer <div> will be cut off and not visible.


*/








/*


syntax of ract player is:-
<ReactPlayer url="....."      controls="..."    ...so on />



look there are many different properties of ReactPlayer  like:-

✅ Common Props


| Prop                 | Type                  | Description                                    |
| -------------------- | --------------------- | ---------------------------------------------- |
| `url`                | `string`              | Required. Video URL (YouTube, Vimeo, etc.)     |
| `controls`           | `boolean`             | Show or hide player controls                   |
| `playing`            | `boolean`             | Autoplay if `true`                             |
| `muted`              | `boolean`             | Mute audio  

|
.......  and many more   others but these we us most often and enough ok

*/









/*understand the meaning of object-cover


It controls how the image fits inside its container.

💡 What it does:  It makes sure the image fills the entire box (container),
 even if it has to crop parts of the image to fit.

📦 Example:Imagine you have a container that is:

300px wide
150px tall

But your image is:

400px wide
400px tall

If you use object-cover:
The image will cover the entire container
It will scale and crop parts so that no empty space is left.
But the image won’t be distorted.
u can try it out in changing screen sizes and testing



🎨 Visual Analogy:
It's like you're framing a photo:
You want it to fill the whole frame
Even if the edges get cut off a bit


*/






/*
understand hover:!opacity-100


🔸 Let’s break it down:
🔹 hover:
This means:
➡️ Apply the style only when the user hovers (moves mouse over) the element.

🔹 opacity-100
This means:
➡️ Make the element fully visible (100% opacity = no transparency).

🔹 ! (important)
Tailwind uses ! to mean:
➡️ “Force this style, even if something else tries to override it.”


*/




/*
understand thsi is syntax of reacty player


Usage
npm install react-player # or yarn add react-player


ans:-
import React from 'react'
import ReactPlayer from 'react-player'

// Render a YouTube video player
<ReactPlayer src='https://www.youtube.com/watch?v=LXb3EKWsInQ' />




*/