import { dict, type Locale } from "./index";
import { CITY } from "./city";
import { FORM } from "./forms";
import type { BidLabels } from "@/components/BidForm";
import type { SubmitLabels } from "@/components/SubmitForm";

/** Ödemeli faz formunun etiketleri. */
export function bidLabels(l: Locale): BidLabels {
  const t = dict(l);
  return {
    linkAria: t.formLinkPlaceholder,
    linkPlaceholder: t.formLinkPlaceholder,
    amountAria: FORM[l].amountAria,
    submit: CITY[l].cityTakeBtn,
    fine: t.formFine,
  };
}

/** Kuruluş fazı formunun etiketleri. */
export function submitLabels(l: Locale): SubmitLabels {
  const t = dict(l);
  const f = FORM[l];
  return {
    linkAria: t.formLinkPlaceholder,
    linkPlaceholder: t.formLinkPlaceholder,
    submit: t.formSubmit,
    sending: f.sending,
    done: f.done,
    errGeneric: f.errGeneric,
    errNetwork: f.errNetwork,
  };
}
