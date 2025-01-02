import React, { useEffect, useState } from "react";
import scales from "../assets/scales.png";
import {
  useAddApplicantMutation,
  useAddDocumentMutation,
  useAddItemMutation,
  useGetRegionsQuery,
} from "../store/services/globalServices";
import { useDispatch, useSelector } from "react-redux";
import {
  setRegion,
  setDistrict,
  setGivenRegion,
  setLossDistrict,
  setApplicant,
  setHasUser,
  setViewReestr,
  setViewReestrItem,
} from "../store/slices/appSlices";
import { useForm } from "react-hook-form";
import Document from "./step/Document";
import Item from "./step/Item";
import { useFileMutation } from "../store/services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Apply = () => {
  const [step, setStep] = useState("step1");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedTel, setSelectedTel] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedGivenRegion, setSelectedGivenRegion] = useState("");
  const [selectedLossDistrict, setSelectedLossDistrict] = useState("");
  const [selectedTypes, setSelectedTypes] = useState("");
  const [selectedMiniTypes, setSelectedMiniTypes] = useState("");
  const [photo, setPhoto] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data, isSuccess } = useGetRegionsQuery();
  const navigate = useNavigate();
  const [addApplicant, { isSuccess: applicatnSuccess }] =
    useAddApplicantMutation();
  const [addDocument, { isSuccess: documentSuccess }] =
    useAddDocumentMutation();
  const [addItem] = useAddItemMutation();
  const [file] = useFileMutation();
  const dispatch = useDispatch();
  const { region, district, applicantId } = useSelector((state) => state.app);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  function stepValidation() {
    if (step === "step1") {
      if (selectedOption != "") {
        setStep("step2");
      }
    } else if (step === "step2") {
      if (
        selectedAddress &&
        selectedDistrict &&
        selectedRegion &&
        selectedTel &&
        selectedEmail
      ) {
        const obj = {
          regionId: selectedRegion,
          districtId: selectedDistrict,
          address: selectedAddress,
          phone: selectedTel,
          email: selectedEmail,
        };
        addApplicant(obj).then((res) => {
          console.log(res.data);
          dispatch(setApplicant(res.data));
        });

        setStep("step3");
      }
    } else if (step === "step3") {
      handleSubmit(submitHandler)();
    }
  }
  function stepValidationPrev() {
    if (step === "step3") {
      setStep("step2");
    } else if (step === "step2") {
      setStep("step1");
    }
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(setRegion(data));
      dispatch(setGivenRegion(data));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (selectedRegion != "") {
      region.forEach((item) => {
        if (item.id === selectedRegion) {
          dispatch(setDistrict(item.district));
        }
      });
    }

    if (selectedRegion == "") {
      dispatch(setDistrict([]));
    }
    setSelectedDistrict("");
  }, [selectedRegion]);

  const submitHandler = async (data) => {
    if (photo != "") {
      const formData = new FormData();
      formData.append("file", photo);
      file(formData).then((res) => {
        const newData = {
          ...data,
          photo: res.data,
          applicantId,
          status: selectedOption.toUpperCase(),
        };
        console.log(newData);
        if (selectedTypes === "document") {
          addDocument(newData).then((res) => {
            dispatch(setViewReestr(res.data));
            console.log(res);
            toast.success("Ariza muvafaqiyatli yuborildi");
            navigate("/view_reestr");
          });
        } else if (selectedTypes === "item") {
          addItem(newData).then((res) => {
            dispatch(setViewReestrItem(res.data));
            console.log(res);
            toast.success("Ariza muvafaqiyatli yuborildi");
            navigate("/view_reestr");
          });
        }
      });
    }
  };

  return (
    <div>
      <header className=" text-center flex items-center justify-center gap-5 h-16 bg-gradient-to-r from-blue-700 to-blue-300">
        <img src={scales} alt="" width={60} height={60} />
        <h1 className="text-white">
          Xizmat: Topilmalar, yo'qolgan buyumlar va hujjatlar bo'yicha so'rov
          yuborish
        </h1>
      </header>
      <div className="m-14">
        {step === "step1" ? (
          <div className=" flex  flex-col mb-6">
            <h1 className="text-green-900 stars">Murojat turi</h1>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="option1"
                  name="searchType"
                  value="missing"
                  checked={selectedOption === "missing"}
                  onChange={handleOptionChange}
                  required
                />
                <label htmlFor="option1">
                  Yo‘qotilgan buyum yoki hujjatlarni izlash uchun so‘rov
                  yuborish
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  type="radio"
                  id="option2"
                  name="searchType"
                  value="found"
                  checked={selectedOption === "found"}
                  onChange={handleOptionChange}
                />
                <label htmlFor="option2">
                  Topilma haqida ariza berish - (Davlat xizmatlari markazlarida
                  tanlash mumkin)
                </label>
              </div>
            </div>
          </div>
        ) : step === "step2" ? (
          <div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 flex-col">
                <label className="stars " htmlFor="region ">
                  Hudud
                </label>
                <select
                  className="bg-transparent border outline-0 rounded-md p-2 border-blue-600"
                  name="region"
                  id="region"
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="">Tanlang...</option>
                  {region.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 flex-col">
                <label className="stars " htmlFor="region ">
                  Tuman
                </label>
                <select
                  className="bg-transparent border outline-0 rounded-md p-2 border-blue-600"
                  name="district"
                  id="district"
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="">Tanlang...</option>
                  {district.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 flex-col">
                <label className="stars " htmlFor="address ">
                  Manzili
                </label>
                <input
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="bg-transparent border outline-0 rounded-md p-2 border-blue-600"
                  type="text"
                  id="address"
                  placeholder="Manzili"
                />
              </div>
              <div className="flex gap-2 flex-col">
                <label className="stars " htmlFor="telNumber ">
                  Telefon raqami
                </label>
                <input
                  value={selectedTel}
                  onChange={(e) => setSelectedTel(e.target.value)}
                  className="bg-transparent border outline-0 rounded-md p-2 border-blue-600"
                  type="number"
                  id="telNumber"
                  placeholder="Telefon raqami"
                />
              </div>
              <div className="flex gap-2 flex-col">
                <label className="stars " htmlFor="email ">
                  Electron manzili
                </label>
                <input
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  className="bg-transparent border outline-0 rounded-md p-2 border-blue-600"
                  type="email"
                  id="email"
                  placeholder="Electron manzili"
                />
              </div>
            </div>
          </div>
        ) : step === "step3" ? (
          <form
            className=" flex flex-col gap-4 "
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex gap-2 flex-col">
              <label className="stars " htmlFor="type ">
                Turni tanlang
              </label>
              <select
                className="bg-transparent border outline-0 rounded-md p-2 border-blue-600"
                name="type"
                id="type"
                value={selectedTypes}
                onChange={(e) => setSelectedTypes(e.target.value)}
                autoComplete="region"
              >
                <option value="">Tanlang...</option>
                <option value="document">Hujjat</option>
                <option value="item">Buyum</option>
              </select>
              {errors.region && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.region.message}
                </p>
              )}
            </div>
            {selectedTypes === "document" ? (
              <div>
                <Document
                  setSelectedGivenRegion={setSelectedGivenRegion}
                  setSelectedLossDistrict={setSelectedLossDistrict}
                  selectedGivenRegion={selectedGivenRegion}
                  selectedLossDistrict={selectedLossDistrict}
                  register={register}
                  setSelectedMiniTypes={setSelectedMiniTypes}
                  selectedMiniTypes={selectedMiniTypes}
                />
                <div className="flex gap-2 flex-col mt-2">
                  <h1> Fotosuratlar</h1>
                  <label
                    htmlFor="photo"
                    className="bg-green-500  rounded-md p-2 h-10 w-32  border transition text-white btn-auth "
                  >
                    faylni tanlang
                  </label>
                  <input
                    style={{ display: "none" }}
                    id="photo"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="bg-transparent border outline-0 rounded-md p-2 border-blue-600"
                    type="file"
                  />
                </div>
              </div>
            ) : selectedTypes === "item" ? (
              <div>
                <Item
                  setSelectedGivenRegion={setSelectedGivenRegion}
                  setSelectedLossDistrict={setSelectedLossDistrict}
                  selectedGivenRegion={selectedGivenRegion}
                  selectedLossDistrict={selectedLossDistrict}
                  register={register}
                  setSelectedMiniTypes={setSelectedMiniTypes}
                  selectedMiniTypes={selectedMiniTypes}
                />
                <div className="flex gap-2 flex-col mt-2">
                  <h1> Fotosuratlar</h1>
                  <label
                    htmlFor="photo"
                    className="bg-green-500  rounded-md p-2 h-10 w-32  border transition text-white btn-auth "
                  >
                    faylni tanlang
                  </label>
                  <input
                    style={{ display: "none" }}
                    id="photo"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="bg-transparent border outline-0 rounded-md p-2 border-blue-600"
                    type="file"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        ) : (
          ""
        )}

        <div className="mt-6 text-end">
          <hr />
          <button
            onClick={() => stepValidationPrev()}
            className=" mt-4 bg-white rounded-md p-2 h-12 hover:bg-white  border transition text-blue-600 border border-blue-600 btn-auth "
          >
            oldingisi
          </button>
          <button
            onClick={() => stepValidation()}
            className="bg-blue-500 rounded-md p-2 h-12   border transition text-white btn-auth "
          >
            {step === "step3" ? "yuborish" : " keyingisi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Apply;
