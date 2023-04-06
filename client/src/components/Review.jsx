import { React, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useStateValue } from "../context/StateProvider";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { getAllUserLists } from "../api";
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { RatingControl } from "react-rating-control";
import * as yup from "yup";

const Review = () => {
  const schema = yup.object().shape({
    content: yup.string().required(),
  }).required();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  let navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();
  let rate = 0;
  const onRatingClick = useCallback((r) => {rate = r;}, []);
  let data = {...useLocation().state};

  const onSubmit = async (form) => {
    try {
      if (!data.reviews) {
        data.reviews = [];
      }
      data.reviews.push({
        owner_id: user.user._id,
        content: form.content,
        rate: rate,
        owner: user.user.name
      })
      data.number_of_rates++;
      data.average_rate = (data.average_rate + rate) / 2;
      await axios.patch("/api/lists/", data)
      .then((res) => console.log(res))
      navigate(-1);
    } catch (error) {
      console.log(error)
    }
  };

  return (
      <div className="w-full flex items-center justify-center flex-col">
        <Header />
        <h5 className="font-bold m-5"><p>Review for :"{data.list_name}"</p></h5>
        <div className="m-5">
          <RatingControl char="★" charsAmount={5} enabled={true} fontsize="24px" onClick={onRatingClick} />
        </div>
        <form className="w-5/6 h-5/6" onSubmit={handleSubmit(onSubmit)}>
          <p className="w-full"><textarea className="w-full h-auto" {...register("content")} /></p>
          <p className="text-center">
            <input className="bg-sky-600 m-2 px-1 text-white hover:bg-sky-800" type="submit"/>
            </p>
        </form>
      </div>
    );
};

export default Review;
