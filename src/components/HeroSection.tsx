import CodeToImage from "./CodeToImage";

export default function HeroSection(){
    return (
        <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black animated-gradient">
            <div className="mx-auto lg:flex lg:items-center">
                <div className="mx-auto text-center pt-40 pb-20">
                    <h1
                        className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl mb-20"
                    >
                        Transform Your 

                        <span className="sm:block"> Code into Stunning Images. </span>
                    </h1>
                   <CodeToImage />                    
                </div>
            </div>
        </section>
    );
}