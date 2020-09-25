import { ActionTree } from "vuex";
import { DefaultState } from "./default-state";
import { Entity } from "./entity";
import { RootState } from "./root-state";

export interface CreateActionConfig<T extends Entity> {
  actions?: ActionTree<DefaultState<T>, RootState>;
  route: string;
  type: string;
}
