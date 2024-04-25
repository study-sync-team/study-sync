"use client"

import { useState } from 'react';

export default function StudyPlanForm() {

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        Promise.all(files.map(fileToDataURL))
            .then((previews) => {
                setImagePreviews(previews);
            })
            .catch((error) => {
                console.error('Error reading files:', error);
                setImagePreviews([]);
            });
    };

    const fileToDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsDataURL(file);
        });
    }


    return (

        <>

            <form>
                <div class="mt-4 mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Course Title</label>
                    <input type="text" placeholder="e.g Anatomy of Head and Neck" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} />
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Course Code</label>
                    <input type="text" placeholder="e.g ANA 301" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} />
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" style={{ backgroundColor: "#F7F2F6", borderRadius: "10px" }}></textarea>
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Upload Your Notes</label>
                    <input class="form-control" type="file" id="formFileMultiple" multiple style={{ height: "44px", backgroundColor: "#F7F2F6", borderRadius: "10px" }} accept="image/*" onChange={handleImageChange} />
                </div>
                <div>
                    {imagePreviews.map((preview, index) => (
                        <img key={index} src={preview} style={{ width: '200px', height: 'auto', margin: '5px' }} />
                    ))}
                </div>
            </form>

        </>

    )

}