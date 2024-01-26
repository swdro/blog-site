import { BaseSyntheticEvent, useState, useEffect } from "react";
import { postBlogApi, getTagsApi } from "../api/apiUrls";

function Upload() {
    const tags = useState({});

    useEffect(() => {
        getTagsApi().then((res) => {
            console.log(res);
        });
    })

    async function handleSubmit(data: BaseSyntheticEvent) {
        data.preventDefault();
        const createdDate = '01/27/2023';

        // grab file
        const file = data.target.elements[0].files[0];

        // create formData and append blob and file
        const formData = new FormData();
        formData.append('createdDate', createdDate);
        formData.append('file', file);

        try {
            const response = await postBlogApi(formData);
            if (response.status === 200) {
                console.log("Created post!"); 
                // show success message
            }
            if (response.status === 500) {
                console.log("Error");
                // indicate error
            }
        } catch (e: any) {
            console.log("error catch: ", e);
        }
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