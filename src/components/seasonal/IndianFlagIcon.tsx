import { motion } from 'framer-motion';

export const IndianFlagIcon = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-[1.2rem] w-[1.2rem]"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <rect width="24" height="6" fill="#FF9933"/>
    <rect y="6" width="24" height="6" fill="white"/>
    <rect y="12" width="24" height="6" fill="#138808"/>
    <circle cx="12" cy="9" r="2" stroke="#000080" strokeWidth="0.5"/>
  </motion.svg>
);