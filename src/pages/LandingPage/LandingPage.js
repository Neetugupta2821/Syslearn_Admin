import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "./LandingPage.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../features/Api/BaseUrl";
import { Upload } from "antd";
const defaultState = {
  heading: "",
  data: "",
};

function LandingPage() {
  const [images, setImages] = useState([]);
  const [preImages, setPreImages] = useState([]);

  const [fileInputKey, setFileInputKey] = useState(Date.now()); // To clear the file input field
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);

  const getdataList = () => {
    axios
      .get(`${baseUrl}get/landing`)
      .then((response) => {
        console.log(response, "landingPage");
        setState((prevData) => ({
          ...prevData,
          heading: response.data.data.heading,
          data: response.data.data.sub_heading,
        }));
        setPreImages(response.data.data.images);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getdataList();
  }, []);

  const submitData = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitFormData = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("heading", state?.heading);
    bodyFormData.append("sub_heading", state?.data);

    for (let i = 0; i < images.length; i++) {
      const image = images[i].file; // Access the image file
      bodyFormData.append(`images[]`, image, image.name);
    }

    for (var pair of bodyFormData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .post(`${baseUrl}landing/page`, bodyFormData)
      .then((response) => {
        Swal.fire(
          "Landing Page update successfully!",
          "You clicked the button!",
          "success"
        );
        getdataList();
        navigate("/admin");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    console.log(files);

    const imageList = [];
    setPreImages((prevImages) => [...prevImages, ...imageList]);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith("image/")) {
        imageList.push({
          id: Date.now() + i, // Generate a unique ID
          file,
        });
      }
    }

    setImages((prevImages) => [...prevImages, ...imageList]);
    setFileInputKey(Date.now()); // Clear the file input field
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = (id) => {
    let deleteId = id;
    axios
      .delete(`${baseUrl}delete/images/${deleteId}`)
      .then((response) => {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getdataList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const handleDelete = (id) => {
  //   alert(id);
  //   setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  // };
  return (
    <>
      <div className="container " style={{ backgroundColor: "#fff" }}>
        <div className="row m-0 ">
          <div className="col-12 my-3">
            <h4 className="text-center">This is Landing Page</h4>
          </div>
          <div className="col-12 my-3">
            <TextField
              fullWidth
              variant="outlined"
              size="large"
              s
              label={"heading "}
              onChange={submitData}
              name="heading"
              value={state.heading}
            />
          </div>
          <div className="col-12 my-3">
            <CKEditor
              editor={ClassicEditor}
              data={state.data}
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
                setState((prevState) => {
                  return {
                    ...prevState,
                    data: data,
                  };
                });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
          <div>
            <input
              type="file"
              key={fileInputKey}
              multiple
              accept="image/*"
              onChange={handleFileSelect}
            />
            <div className="image-container">
              {preImages.map((row, i) => {
                return (
                  <>
                    <div key={i} className="image-item">
                      <img src={row.img_url} alt="loading" />
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(row.id)}
                      >
                        {" "}
                        Delete
                      </button>
                    </div>
                  </>
                );
              })}
              {images.map((image, i) => (
                <div key={i} className="image-item">
                  <img
                    src={URL.createObjectURL(image.file)}
                    alt={image.file.name}
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(image.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 my-5 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary  "
              onClick={submitFormData}
            >
              Submit <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
