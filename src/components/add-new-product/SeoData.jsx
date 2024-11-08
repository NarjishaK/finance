import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const SeoData = () => {
    const [sizes, setSizes] = useState([
        { size: "Lesson1", stock: 0, selected: false },
        { size: "Lesson2", stock: 0, selected: false },
      ]);
    
      const handleSizeChange = (index) => {
        const updatedSizes = [...sizes];
        updatedSizes[index].selected = !updatedSizes[index].selected;
        setSizes(updatedSizes);
      };
    
     
  return (
    <div className="panel">
        <form > 
        <div className="row g-3 mb-3">
            <label htmlFor="salePrice" className="col-md-2 col-form-label col-form-label-sm"> Category</label>
            <div className="col-md-6">
            <div className="form-control-sm p-0">
                    <select className="form-control form-control-sm">
                        <option value="1">select main category</option>
                        <option value="2">Dress</option>
                    </select>
                </div>            
            </div>
            <div className="col-md-4">
                <div className="form-control-sm p-0">
                    <select className="form-control form-control-sm">
                        <option value="1">Sub Category</option>
                        <option value="2">Shirt</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='row g-3'>
            <label htmlFor="Title" className="col-md-2 col-form-label col-form-label-sm">Title</label>
            <div className="col-md-10">
                <input type="text" className="form-control form-control-sm" id="Title" placeholder='Title'/>
            </div>
        </div>
        <br/>
        <div className="row g-3 ">
            <label htmlFor="Description" className="col-md-2 col-form-label col-form-label-sm">Description</label>
            <div className="col-md-10">
                <textarea type="text" className="form-control form-control-sm" id="Description" placeholder='Description'/>
            </div>
        </div>
        <br/>
        <div className="row g-3 mb-3">
            <label htmlFor="salePrice" className="col-md-2 col-form-label col-form-label-sm">Images & Color</label>
            <div className="col-md-6">
            <div className="form-control-sm p-0">
            <input type="file" className="form-control form-control-sm" id="image" placeholder='Images'/>
            </div>            
            </div>
            <div className="col-md-4">
                <div className="form-control-sm p-0">
                    <select className="form-control form-control-sm">
                        <option value="1">Select Language</option>
                        <option value="2">Malayalam</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="row g-3 mb-3">
            <label htmlFor="regularPrice" className="col-md-2 col-form-label col-form-label-sm"> Instructor</label>
            <div className="col-md-10">
                <input type="text" className="form-control form-control-sm" id="regularPrice" placeholder='Instructor'/>
            </div>
        </div>
        <div className="row g-3 mb-3">
            <label htmlFor="salePrice" className="col-md-2 col-form-label col-form-label-sm">Price</label>
            <div className="col-md-6">
            <div className="form-control-sm p-0">
            <input type="number" className="form-control form-control-sm" id="regularPrice" placeholder='Price'/>
            </div>            
            </div>
            <div className="col-md-4">
            <input type="text" className="form-control form-control-sm" id="regularPrice" placeholder='Offer Price'/>
            </div>
        </div>
        <div className="row g-3 mb-3">
            <label htmlFor="" className=" col-form-label col-form-label-sm">What you will learn this  course</label>
            <input type="text" className="form-control form-control-sm" name="introduction" placeholder="benifits description"/>

            <div className="col-md-8">
            <div className="form-control-sm p-0">
            <input type="number" className="form-control form-control-sm" id="regularPrice" placeholder='Points'/>
            </div>            
            </div>
            <div className="col-md-2">
            <button className="btn btn-sm btn-icon btn-primary" id="addAttr" >
                <i className='fa-plus'></i>
            </button>
            </div>
        </div>
        <br/>
        <div className="row align-items-center g-3 mb-3">
            <label className="col-md-2 col-form-label col-form-label-sm">Introduction</label>
            <div className="col-md-10">
                <input type="text" className="form-control form-control-sm" name="introduction" placeholder="Introduction description"/>
            </div>
        </div>
       
        <div className="row g-3">
            <label className="col-md-2 col-form-label col-form-label-sm">Video Link</label>
            <div className="col-md-10">
                <input type="url" className="form-control form-control-sm" name="video_link" placeholder="Video Link"/>
                <span className="input-additional-txt">Use proper link without extra parameter. Don't use short share link/embeded iframe code.</span>
            </div>
        </div>
        <br/>
        <div className="row g-3 mb-3">
          <label className="col-md-2 col-form-label col-form-label-sm">Course Includes</label>
          <div className="col-md-10">
            {sizes.map((size, index) => (
              <div className="row mb-2">
                <div className="col-md-2">
                  <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={`Course Includes ${index}`}
                      onChange={() => handleSizeChange(index)}
                    />
                    <label htmlFor='Course Includes' className="form-check-label">
                    {size.size} 
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </form>
    <br/>
    </div>
  )
}

export default SeoData