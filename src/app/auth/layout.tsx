import ImageComponent from "@/src/components/ui/Image/Image";

const data = [{ srcimg: "/auth/FondoPeru.png" }];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen w-full fixed z-[-1]">
        {data.map((item, index) => (
          <ImageComponent key={index} srcimg={item.srcimg}></ImageComponent>
        ))}
      </div>
      <div className="h-screen w-full flex items-center justify-center">
        <div
          className="bg-red-600 bg-opacity-50 border-[10px] border-white border-opacity-40 
        rounded-2xl w-2/5 h-5/6 flex flex-col items-center justify-center gap-10 p-5"
        >
          <div
            className={`btn-11 h-40 w-40 relative cursor-pointer rounded-[45%]`}
          >
            <ImageComponent srcimg="/inicio/banderaperu.png"></ImageComponent>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}