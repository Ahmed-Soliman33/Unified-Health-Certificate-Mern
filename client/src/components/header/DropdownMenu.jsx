import { Paper, MenuItem, Divider } from "@mui/material";

const DropdownMenu = ({ openMenu, sections, handleClose, mobile }) => {
  return openMenu ? (
    <div
      className={
        mobile
          ? "absolute w-full h-full z-40 "
          : "fixed top-0 left-0 w-full h-full z-40"
      }
      onClick={handleClose}
    >
      <Paper
        elevation={4}
        className={
          mobile
            ? // ? "absolute  w-[70%] h-[280px] overflow-y-auto"
              "mt-10 w-[70%] z-50 overflow-y-auto max-h-[300px] "
            : "fixed top-18 left-0 w-full z-50 overflow-y-auto max-h-full"
        }
        style={{ direction: "rtl" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex justify-start flex-wrap">
          {/* Gradient Background */}
          <div
            className={`absolute top-0 left-0 h-full w-[300px] ${
              mobile ? "" : "bg-gradient-to-r from-[#007573] to-white"
            } z-0`}
          />

          {/* Menu Sections */}
          <div className="relative z-10 flex flex-wrap">
            {sections.map((section, index) => (
              <div key={index} className="min-w-[200px] flex flex-col gap-3">
                {section.items.length > 0 ? (
                  <>
                    <div className="px-4 py-2 font-semibold">
                      {section.title_2}
                    </div>
                    {section.items.map((item, itemIndex) => (
                      <MenuItem key={itemIndex} className="flex items-center">
                        <a
                          href={item.link}
                          className="text-[#0F1721]/[.67] font-[jannaltregular] font-light transition-transform duration-300 transform hover:translate-x-[-8px] hover:text-[#5A8B27]/[.67] text-[14px] "
                        >
                          <span className="text-primary/[.67] text-[14px] ml-1 hover:text-[#5A8B27]/[.67]">
                            ▯
                          </span>

                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </>
                ) : (
                  <>
                    <a
                      href={section.link}
                      className="px-4 py-2 font-semibold transition-transform duration-300 transform hover:translate-x-[-8px] hover:text-[#478608] "
                    >
                      <span className="text-[#478608] text-[14px] ml-1 font-normal hover:text-[#5A8B27]/[.67]">
                        ▯
                      </span>
                      {section.title_2}
                    </a>
                  </>
                )}

                {index < sections.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  ) : null;
};

export default DropdownMenu;
