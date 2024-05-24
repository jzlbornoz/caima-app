const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="124"
        height="124"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin text-primaryColor"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 3a9 9 0 1 0 9 9"></path>
      </svg>
    </div>
  );
};

export { Loader };
