import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <div>
      <button className="px-6 py-1 border-white bg-[#FFDCAB] hover:text-[#AB6B2E] hover:bg-black transition-all rounded-full">
        {props.title}
      </button>
    </div>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Button;
