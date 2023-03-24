/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
// tslint:disable-next-line: no-imports-from-dist
import * as tfOps from '@tensorflow/tfjs-core/dist/ops/ops_for_converter';
import { getParamValue } from './utils';
export const executeOp = (node, tensorMap, context, ops = tfOps) => {
    switch (node.op) {
        case 'BatchMatMul':
        case 'BatchMatMulV2':
        case 'MatMul':
            return [ops.matMul(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context), getParamValue('transposeA', node, tensorMap, context), getParamValue('transposeB', node, tensorMap, context))];
        case 'Einsum':
            return [ops.einsum(getParamValue('equation', node, tensorMap, context), ...getParamValue('tensors', node, tensorMap, context))];
        case 'Transpose':
            return [ops.transpose(getParamValue('x', node, tensorMap, context), getParamValue('perm', node, tensorMap, context))];
        case '_FusedMatMul':
            const [extraOp, activationFunc] = getParamValue('fusedOps', node, tensorMap, context);
            const isBiasAdd = extraOp === 'biasadd';
            const isPrelu = activationFunc === 'prelu';
            const numArgs = getParamValue('numArgs', node, tensorMap, context);
            const leakyreluAlpha = getParamValue('leakyreluAlpha', node, tensorMap, context);
            if (isBiasAdd) {
                if (isPrelu && numArgs !== 2) {
                    throw new Error('Fused MatMul with BiasAdd and Prelu must have two ' +
                        'extra arguments: bias and alpha.');
                }
                if (!isPrelu && numArgs !== 1) {
                    throw new Error('Fused MatMul with BiasAdd must have one extra argument: bias.');
                }
            }
            const [biasArg, preluArg] = getParamValue('args', node, tensorMap, context);
            return [ops.fused.matMul({
                    a: getParamValue('a', node, tensorMap, context),
                    b: getParamValue('b', node, tensorMap, context),
                    transposeA: getParamValue('transposeA', node, tensorMap, context),
                    transposeB: getParamValue('transposeB', node, tensorMap, context),
                    bias: biasArg,
                    activation: activationFunc,
                    preluActivationWeights: preluArg,
                    leakyreluAlpha
                })];
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};
export const CATEGORY = 'matrices';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0cmljZXNfZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWNvbnZlcnRlci9zcmMvb3BlcmF0aW9ucy9leGVjdXRvcnMvbWF0cmljZXNfZXhlY3V0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBR0gsaURBQWlEO0FBQ2pELE9BQU8sS0FBSyxLQUFLLE1BQU0sa0RBQWtELENBQUM7QUFNMUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUV0QyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQ2xCLENBQUMsSUFBVSxFQUFFLFNBQTBCLEVBQ3RDLE9BQXlCLEVBQUUsR0FBRyxHQUFHLEtBQUssRUFBWSxFQUFFO0lBQ25ELFFBQVEsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNmLEtBQUssYUFBYSxDQUFDO1FBQ25CLEtBQUssZUFBZSxDQUFDO1FBQ3JCLEtBQUssUUFBUTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUNkLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQWEsRUFDeEQsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBYSxFQUN4RCxhQUFhLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFZLEVBQ2hFLGFBQWEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRXBCLEtBQUssUUFBUTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUNkLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVcsRUFDN0QsR0FBRyxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVyQixLQUFLLFdBQVc7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FDakIsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxFQUN0RCxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFhLENBQUMsQ0FBQyxDQUFDO1FBRXBFLEtBQUssY0FBYztZQUNqQixNQUFNLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUMxQixhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFjLENBQUM7WUFFdEUsTUFBTSxTQUFTLEdBQUcsT0FBTyxLQUFLLFNBQVMsQ0FBQztZQUN4QyxNQUFNLE9BQU8sR0FBRyxjQUFjLEtBQUssT0FBTyxDQUFDO1lBRTNDLE1BQU0sT0FBTyxHQUNSLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVksQ0FBQztZQUNuRSxNQUFNLGNBQWMsR0FDaEIsYUFBYSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUNsRCxDQUFDO1lBRVgsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsSUFBSSxPQUFPLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRTtvQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FDWCxvREFBb0Q7d0JBQ3BELGtDQUFrQyxDQUFDLENBQUM7aUJBQ3pDO2dCQUNELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRTtvQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FDWCwrREFBK0QsQ0FBQyxDQUFDO2lCQUN0RTthQUNGO1lBQ0QsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FDckIsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBYSxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDdkIsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQWE7b0JBQzNELENBQUMsRUFBRSxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFhO29CQUMzRCxVQUFVLEVBQUUsYUFBYSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FDckQ7b0JBQ1gsVUFBVSxFQUFFLGFBQWEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQ3JEO29CQUNYLElBQUksRUFBRSxPQUFPO29CQUNiLFVBQVUsRUFBRSxjQUF3QztvQkFDcEQsc0JBQXNCLEVBQUUsUUFBUTtvQkFDaEMsY0FBYztpQkFDZixDQUFDLENBQUMsQ0FBQztRQUVOO1lBQ0UsTUFBTSxTQUFTLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0tBQzlEO0FBQ0gsQ0FBQyxDQUFDO0FBRU4sTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtUZW5zb3IsIFRlbnNvcjJEfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbXBvcnRzLWZyb20tZGlzdFxuaW1wb3J0ICogYXMgdGZPcHMgZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlL2Rpc3Qvb3BzL29wc19mb3JfY29udmVydGVyJztcblxuaW1wb3J0IHtOYW1lZFRlbnNvcnNNYXB9IGZyb20gJy4uLy4uL2RhdGEvdHlwZXMnO1xuaW1wb3J0IHtFeGVjdXRpb25Db250ZXh0fSBmcm9tICcuLi8uLi9leGVjdXRvci9leGVjdXRpb25fY29udGV4dCc7XG5pbXBvcnQge0ludGVybmFsT3BFeGVjdXRvciwgTm9kZX0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQge2dldFBhcmFtVmFsdWV9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgZXhlY3V0ZU9wOiBJbnRlcm5hbE9wRXhlY3V0b3IgPVxuICAgIChub2RlOiBOb2RlLCB0ZW5zb3JNYXA6IE5hbWVkVGVuc29yc01hcCxcbiAgICAgY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCwgb3BzID0gdGZPcHMpOiBUZW5zb3JbXSA9PiB7XG4gICAgICBzd2l0Y2ggKG5vZGUub3ApIHtcbiAgICAgICAgY2FzZSAnQmF0Y2hNYXRNdWwnOlxuICAgICAgICBjYXNlICdCYXRjaE1hdE11bFYyJzpcbiAgICAgICAgY2FzZSAnTWF0TXVsJzpcbiAgICAgICAgICByZXR1cm4gW29wcy5tYXRNdWwoXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2EnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcjJELFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdiJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IyRCxcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgndHJhbnNwb3NlQScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgYm9vbGVhbixcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgndHJhbnNwb3NlQicsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXNcbiAgICAgICAgICAgICAgICAgIGJvb2xlYW4pXTtcblxuICAgICAgICBjYXNlICdFaW5zdW0nOlxuICAgICAgICAgIHJldHVybiBbb3BzLmVpbnN1bShcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnZXF1YXRpb24nLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgLi4uZ2V0UGFyYW1WYWx1ZSgndGVuc29ycycsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXNcbiAgICAgICAgICAgICAgICAgIFRlbnNvcltdKV07XG5cbiAgICAgICAgY2FzZSAnVHJhbnNwb3NlJzpcbiAgICAgICAgICByZXR1cm4gW29wcy50cmFuc3Bvc2UoXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3gnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcixcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgncGVybScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyW10pXTtcblxuICAgICAgICBjYXNlICdfRnVzZWRNYXRNdWwnOlxuICAgICAgICAgIGNvbnN0IFtleHRyYU9wLCBhY3RpdmF0aW9uRnVuY10gPVxuICAgICAgICAgICAgICAoZ2V0UGFyYW1WYWx1ZSgnZnVzZWRPcHMnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIHN0cmluZ1tdKTtcblxuICAgICAgICAgIGNvbnN0IGlzQmlhc0FkZCA9IGV4dHJhT3AgPT09ICdiaWFzYWRkJztcbiAgICAgICAgICBjb25zdCBpc1ByZWx1ID0gYWN0aXZhdGlvbkZ1bmMgPT09ICdwcmVsdSc7XG5cbiAgICAgICAgICBjb25zdCBudW1BcmdzID1cbiAgICAgICAgICAgICAgKGdldFBhcmFtVmFsdWUoJ251bUFyZ3MnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcik7XG4gICAgICAgICAgY29uc3QgbGVha3lyZWx1QWxwaGEgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdsZWFreXJlbHVBbHBoYScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXNcbiAgICAgICAgICAgICAgbnVtYmVyO1xuXG4gICAgICAgICAgaWYgKGlzQmlhc0FkZCkge1xuICAgICAgICAgICAgaWYgKGlzUHJlbHUgJiYgbnVtQXJncyAhPT0gMikge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAnRnVzZWQgTWF0TXVsIHdpdGggQmlhc0FkZCBhbmQgUHJlbHUgbXVzdCBoYXZlIHR3byAnICtcbiAgICAgICAgICAgICAgICAgICdleHRyYSBhcmd1bWVudHM6IGJpYXMgYW5kIGFscGhhLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1ByZWx1ICYmIG51bUFyZ3MgIT09IDEpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgJ0Z1c2VkIE1hdE11bCB3aXRoIEJpYXNBZGQgbXVzdCBoYXZlIG9uZSBleHRyYSBhcmd1bWVudDogYmlhcy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgW2JpYXNBcmcsIHByZWx1QXJnXSA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2FyZ3MnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcltdO1xuICAgICAgICAgIHJldHVybiBbb3BzLmZ1c2VkLm1hdE11bCh7XG4gICAgICAgICAgICBhOiBnZXRQYXJhbVZhbHVlKCdhJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IyRCxcbiAgICAgICAgICAgIGI6IGdldFBhcmFtVmFsdWUoJ2InLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcjJELFxuICAgICAgICAgICAgdHJhbnNwb3NlQTogZ2V0UGFyYW1WYWx1ZSgndHJhbnNwb3NlQScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXNcbiAgICAgICAgICAgICAgICBib29sZWFuLFxuICAgICAgICAgICAgdHJhbnNwb3NlQjogZ2V0UGFyYW1WYWx1ZSgndHJhbnNwb3NlQicsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXNcbiAgICAgICAgICAgICAgICBib29sZWFuLFxuICAgICAgICAgICAgYmlhczogYmlhc0FyZyxcbiAgICAgICAgICAgIGFjdGl2YXRpb246IGFjdGl2YXRpb25GdW5jIGFzIHRmT3BzLmZ1c2VkLkFjdGl2YXRpb24sXG4gICAgICAgICAgICBwcmVsdUFjdGl2YXRpb25XZWlnaHRzOiBwcmVsdUFyZyxcbiAgICAgICAgICAgIGxlYWt5cmVsdUFscGhhXG4gICAgICAgICAgfSldO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKGBOb2RlIHR5cGUgJHtub2RlLm9wfSBpcyBub3QgaW1wbGVtZW50ZWRgKTtcbiAgICAgIH1cbiAgICB9O1xuXG5leHBvcnQgY29uc3QgQ0FURUdPUlkgPSAnbWF0cmljZXMnO1xuIl19