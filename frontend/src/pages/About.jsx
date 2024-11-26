 import { assets } from "../assets/assets"
 import NewsLetterBox from "../components/NewsLetterBox"
import Title from "../components/Title"
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="about img" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam veniam explicabo totam laboriosam, perspiciatis aspernatur autem cum unde earum nulla commodi temporibus repellat, iure, recusandae quibusdam! Accusamus exercitationem ullam rem.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae dolorum reprehenderit in ipsam natus, voluptatibus, ipsum non perspiciatis rerum sapiente earum quo omnis! Blanditiis perspiciatis explicabo aut vel neque facilis?</p>
        <b className="">Our Mission</b>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum est voluptatum consequuntur quod, illum, repellat vel minus cum eius nihil adipisci, ipsam obcaecati fuga iusto enim facilis saepe quo nam</p>
        </div>
      </div>
      <div className="text-xl py-4">
         <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className="felx flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, saepe unde architecto ullam a odit laudantium beatae non magni? Recusandae hic corrupti impedit quae nostrum iusto porro quod nulla libero.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, saepe unde architecto ullam a odit laudantium beatae non magni? Recusandae hic corrupti impedit quae nostrum iusto porro quod nulla libero.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exeptional Customer Service:</b>
          <p className="text-gray-600"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, saepe unde architecto ullam a odit laudantium beatae non magni? Recusandae hic corrupti impedit quae nostrum iusto porro quod nulla libero.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About