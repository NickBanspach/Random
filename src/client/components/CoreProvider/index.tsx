import { weightedRandomConfigMolecule, initialConfigMolecule, resultsMolecule } from "../../assets/molecules";
import { StyledEngineProvider, CssVarsProvider, CssBaseline, Box, extendTheme } from "@mui/joy";
import type { WeightedRandomConfig, UpdateProxy } from "../../../assets/types";
import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { ReactNode, ReactElement } from "react";
import { decodeData } from "../../../assets/utils";
import type {} from "@redux-devtools/extension";
import { useDocumentTitle } from "usehooks-ts";
import { useMolecule } from "bunshi/react";
import { devtools } from "valtio/utils";
import { socket } from "../../socket";
import { useEffect } from "react";

const theme = extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "300ms",
        },
      },
    },
    JoyCheckbox: {
      styleOverrides: {
        label: {
          minHeight: "21px",
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "300ms",
        },
        indicator: ({ ownerState }) => ({
          transition: "250ms",
          ...(ownerState.open && {
            transform: "rotate(-180deg)",
          }),
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          "&::before": {
            border: "1.5px solid var(--Input-focusedHighlight)",
            transform: "scaleX(0)",
            left: "2.5px",
            right: "2.5px",
            bottom: 0,
            top: "unset",
            transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
            borderRadius: 0,
            borderBottomLeftRadius: "64px 20px",
            borderBottomRightRadius: "64px 20px",
          },
          "&:focus-within::before": {
            transform: "scaleX(1)",
          },
        },
      },
    },
  },
});

const CoreProvider = ({ children }: { children: ReactNode }): ReactElement => {
  useDocumentTitle("Random");

  const [parent] = useAutoAnimate();

  const initialConfigProxy = useMolecule(initialConfigMolecule);
  const configProxy = useMolecule(weightedRandomConfigMolecule);
  const resultsProxy = useMolecule(resultsMolecule);

  // Redux DevTools
  if (process.env.NODE_ENV !== "production") devtools(configProxy, { name: "configProxy", enabled: true });
  if (process.env.NODE_ENV !== "production") devtools(resultsProxy, { name: "resultsProxy", enabled: true });
  if (process.env.NODE_ENV !== "production") devtools(initialConfigProxy, { name: "initialConfigProxy", enabled: true });

  const updateProxy: UpdateProxy = (data) => {
    // Clone the arrays to avoid reference sharing
    [initialConfigProxy.choices, initialConfigProxy.weights] = [
      [...data.choices],
      [...Array.from(data.weights)],
    ];
    [configProxy.choices, configProxy.weights] = [[...data.choices], [...Array.from(data.weights)]];
  };

  useEffect(() => {
    const onConnect = () => {
      console.log("connected");

      socket.on("weightedRandomConfig", async (data) => {
        console.log("Received weightedRandomConfig from server:", data);
        updateProxy(
          JSON.parse(decodeData(data), (key: string, value: Array<unknown> | ArrayLike<number>) => {
            if (key === "choices" && Array.isArray(value)) {
              return value.map((choice) => String(choice));
            }
            return value;
          }) as WeightedRandomConfig<string>,
        );
      });
    };

    const onDisconnect = () => {
      console.log("disconnected");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  });

  return (
    <>
      <InitColorSchemeScript />
      <StyledEngineProvider injectFirst>
        <CssVarsProvider defaultMode="system" theme={theme}>
          <CssBaseline />
          <Box ref={parent} className="flex justify-center items-center w-screen h-screen">
            {children}
          </Box>
        </CssVarsProvider>
      </StyledEngineProvider>
    </>
  );
};

export default CoreProvider;
