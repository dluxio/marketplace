import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import { attributeColors } from "../../constants";

const NFTManagement = () => {
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState<any>();
  const [script, setScript] = useState("");

  const router = useRouter();
  const { set_uid } = router.query;
  const uid = (set_uid as string)!.split(":")[1];
  const set = (set_uid as string)!.split(":")[0];
  const apiLink: string = useRecoilValue(apiLinkState);

  useEffect(() => {
    if (!set_uid) router.push("/");

    axios.get(`${apiLink}api/set/${set}`).then(({ data }) => {
      setScript(data.set.script);
      console.log(data);
    });
  }, []);

  const fetchImage = () => {
    fetch(`https://ipfs.io/ipfs/${script}?${uid}`)
      .then((response) => response.text())
      .then((data) => {
        const code = `(//${data}\n)("${uid}")`;
        const SVG = eval(code);
        setDescription(SVG.set.Description);
        let attributeObj = {};
        SVG.attributes.forEach((attr: any) => {
          attributeObj = { ...attributeObj, ...attr };
        });
        setAttributes(attributeObj);

        document.getElementById(`${set}-${uid}-details`)!.innerHTML = SVG.HTML;
      });
  };

  useEffect(() => {
    if (script) fetchImage();
  }, [script]);

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between mt-5 mb-2 text-white text-xl">
      <div className="flex w-1/3 ml-10 flex-col gap-4 text-center bg-gray-600 rounded-xl border-2 border-gray-800 ">
        <div id={`${set}-${uid}-details`} className="w-1/2 mx-auto my-5"></div>
        <h1 className="text-white text-xl font-bold my-5">{uid}</h1>
        <p className="text-white text-center mx-20">{description}</p>
        <div className="my-3">
          {attributes &&
            Object.keys(attributes).map((attr: any) => (
              <div className="mx-20 flex my-2 items-center gap-5">
                <h1
                  className={"text-white text-left px-2 py-1 w-auto rounded-xl"}
                  style={{ backgroundColor: attributeColors[attr] }}
                >
                  {attr}
                </h1>
                <h1 className="text-white text-center">{attributes[attr]}</h1>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-grow justify-center items-center">
        <h1>TBD</h1>
      </div>
    </div>
  );
};

export default NFTManagement;
