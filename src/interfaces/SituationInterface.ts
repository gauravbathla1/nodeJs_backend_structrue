import { Document, Types } from 'mongoose';

export interface SituationInterface extends Document {
  situationName: string | null;
  image: string | null;
  categoryName: string | null;
  categoryId: Types.ObjectId | null; // Assuming 'BookClub' is the correct model
  peaceContent: PeaceContent;
  flowContent: FlowContent;
  isActive: boolean;
  isDeleted: boolean;
}

interface PeaceContent {
  content: string | null;
  animation: string | null;
}

interface FlowContent {
  content: string | null;
  animation: string | null;
}
