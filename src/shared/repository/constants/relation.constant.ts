import { Injectable, Scope } from '@nestjs/common';
import {
  MappingTable,
  RelationType,
  SpaceRelation,
} from '../models/repository.model';

@Injectable({
  scope: Scope.DEFAULT,
})
export class RelationInstance {
  public static relation: SpaceRelation = {};
  public static mappingTable: MappingTable = {};

  public static initRelation(
    param: RelationType,
    nameEntity: string,
    nameTable: string,
    as: string,
    inverseSide: string,
  ) {
    if (this.relation[nameEntity]) {
      this.relation[nameEntity].relations[as] = param;
    } else {
      this.relation[nameEntity] = {
        relations: {
          [as]: param,
        },
        nameTable,
      };
    }
    if (param.model && inverseSide) {
      if (this.relation[param.model].relations[inverseSide])
        this.relation[param.model].relations[inverseSide].model = nameEntity;
      else
        this.relation[param.model].relations[inverseSide] = {
          model: nameEntity,
        };
    }
  }
  public static setTable(nameTable: string, nameEntity: string) {
    this.relation[nameEntity].nameTable = nameTable;
    this.mappingTable[nameTable] = nameEntity;
  }
}
