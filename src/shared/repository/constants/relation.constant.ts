import { Injectable, Scope } from '@nestjs/common';
import { RelationType, SpaceRelation } from '../models/repository.model';

@Injectable({
  scope: Scope.DEFAULT,
})
export class RelationInstance {
  public static relation: SpaceRelation = {};

  public static initRelation(param: RelationType, nameEntity: string) {
    if (this.relation[nameEntity]) {
      this.relation[nameEntity].relations.push(param);
      return;
    }
    const relations: RelationType[] = [param];
    this.relation[nameEntity] = {
      relations,
      nameTable: '',
    };
  }
  public static setTable(nameTable: string, nameEntity: string) {
    this.relation[nameEntity].nameTable = nameTable;
  }
}
