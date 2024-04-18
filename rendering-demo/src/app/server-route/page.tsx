import { ImageSlider } from "@/components/ImageSlider";
import { serverSideFunction } from "@/utils/server-utils";
// import { clientSideFunction } from "@/utils/client-utils";

export default function ServerRoutePage() {
  console.log("Server route rendered");
  const result1 = serverSideFunction();
  // const result2 = clientSideFunction();
  return (
    <>
      <h1>ServerRoutePage</h1>
      <p>{result1}</p>
      {/*<p>{result2}</p>*/}
      <ImageSlider />
    </>
  );
}
