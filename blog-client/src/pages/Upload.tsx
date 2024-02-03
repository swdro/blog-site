import { BaseSyntheticEvent, useState, useEffect } from "react";
import { postBlogApi, getTagsApi } from "../api/apiUrls";
import { Navigate, useNavigate } from "react-router-dom";

type TagType = { 
    tagId: string,
    tagName: string, 
    isSelected: boolean 
} 

function Upload() {
    const [tags, setTags] = useState<TagType[]>([]);
    const [createdDate, setCreatedDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getTagsApi().then((res) => {
            console.log(res);
            let tagsTemp: TagType[] = [];
            for (let tagData of res.data) {
                let tagId = tagData.id;
                let tagName = tagData.tag_name;
                tagsTemp.push({
                    tagId,
                    tagName,
                    isSelected: false
                })
            }
            setTags(tagsTemp);
        });
    }, []);

    function isDateValid(dateStr: string) {
        if (!isNaN(Date.parse(dateStr))) {
            return true;
        }
        return false;
    }

    async function handleSubmit(e: BaseSyntheticEvent) {
        e.preventDefault();

        // grab file
        const files = e.target.elements[0].files;
        if (files.length == 0) {
            console.log("Please select a file from your computer");
            return;
        }
        const file = files[0];

        // check date
        if (!isDateValid(createdDate)) {
            console.log("date format error");
            return;
        }

        // get only necessary tag data
        const tagsData = tags
            .filter((tag) => tag.isSelected)
            .map((tag: TagType) => tag.tagId);

        // create formData and append date, tags, and file
        const formData = new FormData();
        formData.append('tagsData', JSON.stringify(tagsData));
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
            if (e.response.status === 401) {
                console.log("unauthorized");
                navigate('/login');
            }
        }
    }

    function handleTagClick(key: string) {
        console.log(key);
        setTags(tags.map((tag: TagType) =>
            (tag.tagId === key) ? {
                ...tag,
                isSelected: !tag.isSelected
            } : tag
        ));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="file" type="file" multiple />
                <button type="submit" className="bg-white">Upload</button>
            </form>

            <div>
                <div>Created Date</div>
                <input onChange={(e) => setCreatedDate(e.target.value)} value={createdDate} />
            </div>

            <div className="flex flex-wrap gap-5 mt-10">
                {tags.map((tag) => {
                    return (
                        <button 
                            key={tag.tagId} 
                            onClick={() => handleTagClick(tag.tagId)} 
                            style={{ backgroundColor: tag.isSelected ? 'green' : 'white' }}
                            className={`bg${tag.isSelected ? 'green' : 'white'} rounded-lg px-2`}
                        >
                            {tag.tagName}
                        </button>
                    )
                })}
            </div>

            {/* <form action={`${BASE_URL}/post`} method="post" encType="multipart/form-data">
                <input name="file" type="file" multiple />
                <button type="submit">Upload</button>
            </form> */}
        </div>
    )
}

export default Upload;