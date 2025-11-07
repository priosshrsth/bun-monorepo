import { Dialog } from "@rnt-lib/core";
import { useState } from "react";
import preview from "@/preview";

function DialogComponent() {
  const [_open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)} type="button">
        Open
      </button>
      <Dialog onClose={() => setOpen(false)} open={_open}>
        Hello
      </Dialog>
    </div>
  );
}

const meta = preview.meta({ component: DialogComponent });

export default meta;

export const Primary = meta.story({
  args: {
    children: "This is a dialog",
  },
});
