import { BaseSyntheticEvent, SyntheticEvent } from "react";
import { BASE_URL } from "../api/apiUrls";
import axios from "axios";

function Upload() {

    function handleSubmit(data: BaseSyntheticEvent) {
        data.preventDefault();

        // create date object, json, and blob
        const createdDate = '01/27/2023';

        // grab file
        const file = data.target.elements[0].files[0];

        // create formData and append blob and file
        const formData = new FormData();
        formData.append('createdDate', createdDate);
        formData.append('file', file);

        console.log("formData: ", formData);

        axios({
            method: 'post',
            url: `${BASE_URL}/post`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="file" type="file" multiple />
                <button type="submit">Upload</button>
            </form>

            {/* <form action={`${BASE_URL}/post`} method="post" encType="multipart/form-data">
                <input name="file" type="file" multiple />
                <button type="submit">Upload</button>
            </form> */}
        </div>
    )
}

export default Upload;