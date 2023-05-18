import React, {useEffect, useState} from 'react';
import '../App.css'
import {IconButton} from "@chakra-ui/react";
import {AiOutlineClose} from 'react-icons/ai';


const ImagePicker = ({setSelectedImages}) => {
    const [images, setImages] = useState([])

    useEffect(() => {
        console.log(images)
    }, [images])

    const onSelectFile = (event) => {

        const files = event.target.files;

        console.log(files)

        const filesArray = Array.from(files);
        setSelectedImages(filesArray)

        const imagesArray = filesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setImages((previousImages) => previousImages.concat(imagesArray));

        // FOR BUG IN CHROME
        event.target.value = "";
    };

    function deleteHandler(image) {
        setImages(images.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }

    return (
        <section>
            <label className="labelImage">
                + Add images
                <br/>
                <span>up to 10 images</span>
                <input
                    className="imageInput"
                    type="file"
                    name="images"
                    onChange={onSelectFile}
                    multiple
                    accept="image/png , image/jpeg, image/webp"
                />
            </label>
            <br/>

            <input type="file" multiple hidden="true"/>

            {images.length > 0 &&
                (images.length > 10 && (
                    <p className="error">
                        You can't upload more than 10 images! <br/>
                        <span>
                            please delete <b> {images.length - 10} </b> of them{" "}
                        </span>
                    </p>
                ))}

            <div className="images">
                {images &&
                    images.map((image, index) => {
                        return (
                            <div key={image} className="image">
                                <img src={image} style={{height: "150px", width: "150px"}} alt="upload"/>
                                <IconButton
                                    className='imageButton'
                                    colorScheme='red'
                                    variant='outline'
                                    size='sm'
                                    icon={<AiOutlineClose/>}
                                    onClick={() => deleteHandler(image)} aria-label={'Delete image'}>
                                </IconButton>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default ImagePicker;