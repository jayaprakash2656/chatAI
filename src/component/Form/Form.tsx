import { useState } from 'react';
import { FileUpload } from '../FileUpload/FileUpload'
import { ModalPopUP } from '../Modal/modal';

export const FormComponnt = () => {
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open); 
    
    const handleClose = () => setOpen(false);

    return (
        <>
            <section className=" py-1 bg-gray-50">
                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-gray-700 text-xl font-bold">
                                    Complaince Report
                                </h6>
                                <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" onClick={handleOpen}  type="button">
                                    Response
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-gray-400 text-blue-600/100 text-sm mt-3 mb-6 font-bold uppercase">
                                    Client Details
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                                Client Name
                                            </label>
                                            <select disabled className="border-r-8 border-transparent  px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                <option value="pschat">PS Chat</option>
                                                <option value="chatgpt">Chat Gpt</option>
                                                <option value="copilot">Copilot</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                                Model
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Enter Username"
                                                value="gpt-4o-mini"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="text-gray-400 text-sm mt-6 mb-6 font-bold uppercase">
                                    Upload Files
                                </h6>
                                <div className="flex flex-wrap">
                                    <FileUpload />
                                </div>
                                {/* OR divider */}
                                <div className="relative flex py-5 items-center">
                                    <div className="flex-grow border-b-1 border-t border-gray-400"></div>
                                    <span className="flex-shrink mx-4 text-gray-400">OR</span>
                                    <div className="flex-grow border-b-1 border-t border-gray-400"></div>
                                </div>
                                {/* End OR divider */}
                                <h6 className="text-gray-400 text-blue-600/100 text-sm mt-3 mb-6 font-bold uppercase">
                                    Repository Details
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                                Repo URL
                                            </label>
                                            <input
                                                type="text"
                                                placeholder='Enter Repo URL'
                                                className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                                User Name
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Enter Username"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                                Branch
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Enter Branch"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white active:bg-blue-600 font text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    >
                                        Generate
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ModalPopUP handleOpen={handleOpen} handleClose={handleClose} open={open}/>
        </>
    )
}
