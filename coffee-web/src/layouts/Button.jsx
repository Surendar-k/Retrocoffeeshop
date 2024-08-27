import PropTypes from 'prop-types';

const Button = ({ title, onClick }) => {
  return (
    <div>
      <button 
        className="px-6 py-1 border-white bg-[#FFDCAB] hover:text-[#AB6B2E] hover:bg-black transition-all rounded-full"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Changed to optional
};

export default Button;
