import { FileUpload } from '../FileUpload/FileUpload'

export const FormComponnt = () => {
  return (
    <>
<section className=" py-1 bg-blueGray-50">
<div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div className="rounded-t bg-white mb-0 px-6 py-6">
      <div className="text-center flex justify-between">
        <h6 className="text-blueGray-700 text-xl font-bold">
          Complaince Report
        </h6>
        <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
          History
        </button>
      </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Upload Files
        </h6>
        <div className="flex flex-wrap">
        <FileUpload/>
        </div>
        <hr className="mt-6 border-b-1 border-blueGray-300"/>

        <h6 className="text-blueGray-900 text-sm mt-3 mb-6 font uppercase">
          Prompt Here
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <textarea placeholder='Type here' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows={10}>Install git extension on vscode</textarea>
            </div>
          </div>
        </div>
                       <div className="flex justify-end mt-2">
                    <button
                        type="button"
                        className="bg-blue-500 text-white active:bg-blue-600 font text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    >
                        Generate
                    </button>
                </div>
      </form>
    </div>
  </div>
</div>
</section>
    </>
  )
}
