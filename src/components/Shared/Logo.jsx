const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="avatar">
        <div className="text-green-500 w-10 rounded-full ring-3 ">
          <img src="/logo.png" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-yellow-500">
        <span className="text-green-500">S</span>tyle
        <span className="text-green-500">D</span>ecor
      </h2>
    </div>
  );
};

export default Logo;
