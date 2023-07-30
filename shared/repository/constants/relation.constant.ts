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
        leave: [],
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
  public static initTable(nameTable: string, nameEntity: string) {
    this.relation[nameEntity].nameTable = nameTable;
    this.mappingTable[nameTable] = nameEntity;
  }
  public static initLeave(nameEntity: string, propertyKey: string) {
    if (this.relation[nameEntity]) {
      this.relation[nameEntity].leave.push(propertyKey);
      return;
    }
    this.relation[nameEntity] = {
      relations: {},
      nameTable: '',
      leave: [propertyKey],
    };
    return;
  }
}
