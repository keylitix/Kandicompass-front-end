export default function AboutUs() {
    return (
        <div className="bg-wrapper">
            <div className="left-spark" />
            <div className="right-spark" />
            <div className="container mx-auto px-[100px]">
                <div className="h-[300px] flex items-center justify-center">
                    <h1 className="font-[700] text-[46px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">About Us</h1>
                </div>
                <div className="mb-[100px]">
                    <div className="p-3">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-semibold">Welcome to [Your Brand Name] – Where Every Bead Tells a Story</h3>
                            <p className="text-xs font-sans leading-[1.6]">At [Your Brand Name], we're more than just a bead shop — we’re a vibrant community of creators, crafters, and dreamers. Born from a passion for handmade art and a love for intricate detail, our mission is to bring the beauty of beads to everyone, from beginners to professional designers.</p>
                        </div>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-semibold">Our Story</h3>
                            <p className="text-xs font-sans leading-[1.6]">What started as a small side project at a kitchen table has grown into a trusted destination for high-quality beads sourced from around the world. Whether you're making jewellery, adding embellishments to textiles, or crafting something entirely unique, we believe the right beads can transform your vision into reality.</p>
                        </div>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-semibold">What We Offer</h3>
                            <div>
                                <p className="text-xs font-sans leading-[1.6]">Wide Selection:  From seed beads and gemstone beads to glass, wood, and metal — our curated collection is designed to inspire creativity.</p>
                                <p className="text-xs font-sans leading-[1.6]"> Quality You Can Trust:  Every bead is hand-picked for quality, colour, and craftsmanship. No cheap fillers, no compromises.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-semibold">Our Values</h3>
                            <div>
                                <ul className="list-disc pl-5">
                                    <li className="text-xs font-sans leading-[1.6]">
                                        <span className="font-semibold">Craftsmanship:</span>{" "}
                                        We respect the artistry in every design, no matter how big or small.
                                    </li>
                                    <li className="text-xs font-sans leading-[1.6]">
                                        <span className="font-semibold">Community:</span>{" "}
                                        We love seeing what our customers create. Tag us, share your projects, and join a growing network of passionate makers.
                                    </li>
                                    <li className="text-xs font-sans leading-[1.6]">
                                        <span className="font-semibold">Sustainability:</span>{" "}
                                        Wherever possible, we partner with suppliers who share our commitment to ethical sourcing and eco-friendly practices.
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
