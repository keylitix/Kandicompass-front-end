import "./Charms.css"
import ring from "../../../public/ring4.svg"
import ring5 from "../../../public/ring5.svg"
import Image from "next/image"
const Charms = () => {
  return (
    <div className="charmsMain">
      <h3 className="charmsMainH3 pt-14">Charms in Action</h3>
      <p className="charmsMainP">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

      <div className="charmsMainCard flex items-center justify-center gap-12 pt-20">
        <div className="firstChild flex flex-col gap-5">
          <div className="firstChild1 flex items-cener justify-center relative">
            <Image src={ring} alt="ring" width={220} height={248} className=" absolute top-8" />
            <button className="firstChild1Button absolute text-white top-25">SHOP NOW</button>
            <div className="absolute bottom-6 text-gray-600 ">
              <h3>RainBow Hear</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </div>
          </div>
          <div className="secondChild2 text-white flex flex-col items-center">
            <Image src={ring} alt="ring" width={262} height={122} />
            <h3>RainBow Hear</h3>
            <p className="text-[14px] w-50 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
        </div>
        <div className="secondChild text-white flex flex-col items-center justify-around">
          <Image src={ring5} alt="ring" width={262} height={258} />
          <div>
            <h3>RainBow Hear</h3>
            <p className="text-[14px] w-50 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
        </div>
        <div className="thiirdChild flex flex-col gap-5">
          <div className="thiirdChild1 text-white flex flex-col items-center">
            <Image src={ring} alt="ring" width={262} height={122} />
            <h3>RainBow Hear</h3>
            <p className="text-[14px] w-50 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div className="thiirdChild2 text-white flex flex-col items-center">
            <Image src={ring} alt="ring" width={262} height={122} />
            <h3>RainBow Hear</h3>
            <p className="text-[14px] w-50 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
        </div>
      </div>

      <div className="charmsBottom">
        <h3 className="pt-32">Stay in Touch</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

        <div className="charmsBottomInput text-center mt-4">
          <input type="text" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default Charms